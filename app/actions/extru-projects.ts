"use server"

import { supabase } from "@/lib/supabase"

export async function addProject(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const photo = formData.get("photo") as File | null

  if (!name?.trim() || !description?.trim()) {
    return { error: "Name and description are required" }
  }

  let imageUrl: string | null = null

  // Handle optional photo upload
  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg"
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("extru-project-images")
      .upload(fileName, photo, {
        contentType: photo.type,
        cacheControl: "3600",
      })

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` }
    }

    const { data: urlData } = supabase.storage
      .from("extru-project-images")
      .getPublicUrl(fileName)

    imageUrl = urlData.publicUrl
  }

  const { data, error } = await supabase
    .from("extru_projects")
    .insert({
      name: name.trim(),
      description: description.trim(),
      image_url: imageUrl,
    })
    .select("id")
    .single()

  if (error) {
    return { error: error.message }
  }

  return { id: data.id }
}

export async function getProject(projectId: string) {
  const { data: project, error } = await supabase
    .from("extru_projects")
    .select("*")
    .eq("id", projectId)
    .single()

  if (error || !project) {
    return null
  }

  const { data: ratings } = await supabase
    .from("extru_ratings")
    .select("rating")
    .eq("project_id", projectId)

  const totalRatings = ratings?.length ?? 0
  const averageRating =
    totalRatings > 0
      ? ratings!.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0

  return {
    ...project,
    averageRating: Math.round(averageRating * 10) / 10,
    totalRatings,
  }
}

export async function getAllProjects() {
  const { data: projects, error } = await supabase
    .from("extru_projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error || !projects) {
    return []
  }

  // Fetch all ratings in one query
  const projectIds = projects.map((p) => p.id)
  const { data: allRatings } = await supabase
    .from("extru_ratings")
    .select("project_id, rating")
    .in("project_id", projectIds)

  // Group ratings by project
  const ratingsMap: Record<string, number[]> = {}
  allRatings?.forEach((r) => {
    if (!ratingsMap[r.project_id]) ratingsMap[r.project_id] = []
    ratingsMap[r.project_id].push(r.rating)
  })

  return projects.map((project) => {
    const ratings = ratingsMap[project.id] || []
    const totalRatings = ratings.length
    const averageRating =
      totalRatings > 0
        ? Math.round((ratings.reduce((s, r) => s + r, 0) / totalRatings) * 10) / 10
        : 0

    return {
      ...project,
      averageRating,
      totalRatings,
    }
  })
}

export async function rateProject(projectId: string, rating: number, feedback?: string) {
  if (rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5" }
  }

  const { error } = await supabase
    .from("extru_ratings")
    .insert({
      project_id: projectId,
      rating,
      feedback: feedback?.trim() || null,
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

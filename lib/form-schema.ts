import * as z from "zod"

export enum ProjectType {
  Residential = "Residential",
  Commercial = "Commercial",
  Industrial = "Industrial",
  Infrastructure = "Infrastructure",
}

export const formSchema = z.object({
  projectType: z.nativeEnum(ProjectType),
})


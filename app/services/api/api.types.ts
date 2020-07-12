import { GeneralApiProblem } from "./api-problem"
import { CategorySnapshot, PostSnapshot } from "../../models"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetCategoryResult = {
  kind: "ok";
  categories: CategorySnapshot[],
  total: number,
  totalPages: number
} | GeneralApiProblem
export type GetPostsResult = { kind: "ok"; posts: PostSnapshot[] } | GeneralApiProblem
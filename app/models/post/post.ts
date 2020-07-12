import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CategoryModel, Category } from "../category/category"
/**
 * Model description here for TypeScript hints.
 */


export const FeaturedMediaModel = types.model("media").props({
  medium: types.maybeNull(types.string),
  large: types.maybeNull(types.string),
  thumbnail: types.maybeNull(types.string),
  source_url: types.maybeNull(types.string),
})
export const RenderModel = types.model("render").props({
  rendered: types.string
})
export const PostModel = types
  .model("Post")
  .props({
    id: types.identifier,
    date: types.string,
    title: RenderModel,
    content: RenderModel,
    status: types.string,
    featured_media: types.optional(types.array(FeaturedMediaModel), []),
    categories: types.array(types.reference(types.late(() => CategoryModel))),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PostType = Instance<typeof PostModel>
export interface Post extends PostType { }
type PostSnapshotType = SnapshotOut<typeof PostModel>
export interface PostSnapshot extends PostSnapshotType { }

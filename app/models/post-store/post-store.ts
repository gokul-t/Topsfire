import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { PostModel, Post } from "../post/post"
import { Alert } from "react-native"

/**
 * Model description here for TypeScript hints.
 */
export const PostStoreModel = types
  .model("PostStore")
  .props({
    total: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 0),
    posts: types.optional(types.array(PostModel), []),
  })
  .extend(withEnvironment)
  .views(self => ({
    get nextPage() {
      return self.currentPage !== self.totalPages
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    find: (postId: string): Post => {
      const post = self.posts.find(c => c.id == postId)
      __DEV__ && console.tron.log(self.posts, postId)
      return post
    },
    savePosts: (postSnapShots: PostStoreSnapshot[], total, totalPages) => {
      const postModels: Post[] = postSnapShots.map(c => PostModel.create(c))
      self.currentPage = 1
      self.total = total
      self.totalPages = totalPages
      self.posts.replace(postModels)
    },
    mergePosts: (postSnapShots: PostStoreSnapshot[], total, totalPages) => {
      const postModels: Post[] = postSnapShots.map(c => PostModel.create(c))
      self.currentPage = self.currentPage + 1
      self.total = total
      self.totalPages = totalPages
      self.posts.replace(self.posts.concat(postModels))
    },
  }))
  .actions(self => ({
    getPosts: flow(function*({ categoryId }: { categoryId?: string }) {
      const page = 1
      const result: any = yield self.environment.api.getPosts({ categoryId, page })
      if (result.kind === "ok") {
        self.savePosts(result.posts, result.total, result.totalPages)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    loadMorePosts: flow(function*({ categoryId }: { categoryId?: string }) {
      const result: any = yield self.environment.api.getPosts({
        categoryId,
        page: self.currentPage + 1,
      })
      if (result.kind === "ok") {
        self.mergePosts(result.posts, result.total, result.totalPages)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars// eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}

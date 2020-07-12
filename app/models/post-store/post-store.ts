import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { PostModel, Post } from "../post/post"

/**
 * Model description here for TypeScript hints.
 */
export const PostStoreModel = types
  .model("PostStore")
  .props({
    categoryId : types.maybeNull(types.string),
    refreshing : types.optional(types.boolean,false),
    loading : types.optional(types.boolean,false),
    posts : types.optional(types.array(PostModel),[])
  })
  .extend(withEnvironment) 
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self=>({
    savePosts:(postSnapShots:PostStoreSnapshot[])=>{
      const postModels :Post[] = postSnapShots.map(c=>PostModel.create(c))
      self.posts.replace(postModels)
    },
    mergePosts:(postSnapShots:PostStoreSnapshot[])=>{
      const postModels :Post[] = postSnapShots.map(c=>PostModel.create(c))
      self.posts.replace(self.posts.concat(postModels))
    }
  }))
  .actions(self => ({
    getPosts : flow(function *({ categoryId }){
      self.categoryId = categoryId;
      self.savePosts([])
      self.refreshing = true;
      const result:any = yield self.environment.api.getPosts({ categoryId })
      if(result.kind === "ok"){
        self.savePosts(result.posts)
      }else{
        __DEV__ && console.tron.log(result.kind);
      }
      self.refreshing = false;
    }),
    loadMorePosts : flow(function *(){
      self.loading = true;
      const result:any = yield self.environment.api.loadMorePosts()
      if(result.kind === "ok"){
        self.mergePosts(result.posts)
      }else{
        __DEV__ && console.tron.log(result.kind);
      }
      self.loading = false;
    })
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

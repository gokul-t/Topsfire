import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PostStoreModel, PostStore } from "../post-store/post-store"
/**
 * Model description here for TypeScript hints.
 */

export const CategoryPostStoreModel = types
  .model("CategoryPostStore")
  .props({
    categoryPostStores: types.optional(types.map(PostStoreModel), {})
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getPostStore: (categoryId: string) => {
      const postStore = self.categoryPostStores.get(categoryId);
      if (postStore)
        return postStore;
      return self.categoryPostStores.set(categoryId,PostStoreModel.create())
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CategoryPostStoreType = Instance<typeof CategoryPostStoreModel>
export interface CategoryPostStore extends CategoryPostStoreType { }
type CategoryPostStoreSnapshotType = SnapshotOut<typeof CategoryPostStoreModel>
export interface CategoryPostStoreSnapshot extends CategoryPostStoreSnapshotType { }

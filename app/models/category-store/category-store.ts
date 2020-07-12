import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { CategoryModel, Category } from "../category/category"
/**
 * Model description here for TypeScript hints.
 */
export const CategoryStoreModel = types
.model("CategoryStore")
.props({
  categories : types.optional(types.array(CategoryModel),[]),
  refreshing:types.optional(types.boolean,false)
})
.extend(withEnvironment) 
.views(self=>({})) // eslint-disable-line @typescript-eslint/no-unused-vars
.actions(self=>({
  saveCategories:(categorySnapShots:CategoryStoreSnapshot[])=>{
    const categoryModels :Category[] = categorySnapShots.map(c=>CategoryModel.create(c))
    self.categories.replace(categoryModels)
  }
}))
.actions(self=>({
  getCategories: flow(function *(){
    self.refreshing = true;
    const result = yield self.environment.api.getCategories()
    if(result.kind === "ok"){
      self.saveCategories(result.categories)
    }else{
      __DEV__ && console.tron.log(result.kind);
    }
    self.refreshing = false;
  })
}))

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CategoryStoreType = Instance<typeof CategoryStoreModel>
export interface CategoryStore extends CategoryStoreType {}
type CategoryStoreSnapshotType = SnapshotOut<typeof CategoryStoreModel>
export interface CategoryStoreSnapshot extends CategoryStoreSnapshotType {}

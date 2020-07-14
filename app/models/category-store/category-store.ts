import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { CategoryModel, Category } from "../category/category"
import { Alert } from "react-native"
/**
 * Model description here for TypeScript hints.
 */
export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    total: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 0),
    categories: types.optional(types.array(CategoryModel), []),
  })
  .extend(withEnvironment)
  .views(self => ({
    get nextPage() {
      return self.currentPage !== self.totalPages
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    find: (categoryId: string) => {
      const category = self.categories.find(c => c.id === categoryId)
      return category
    },
    saveCategories: (categorySnapShots: CategoryStoreSnapshot[], total, totalPages) => {
      const categoryModels: Category[] = categorySnapShots.map(c => CategoryModel.create(c))
      self.currentPage = 1
      self.total = total
      self.totalPages = totalPages
      self.categories.replace(categoryModels)
    },
    mergeCategories: (categorySnapShots: CategoryStoreSnapshot[], total, totalPages) => {
      const categoryModels: Category[] = categorySnapShots.map(c => CategoryModel.create(c))
      self.currentPage = self.currentPage + 1
      self.total = total
      self.totalPages = totalPages
      categoryModels.map(categoryModel => self.categories.push(categoryModel))
    },
  }))
  .actions(self => ({
    getCategories: flow(function*() {
      __DEV__ && console.tron.log("re fetching categories")
      try {
        const result = yield self.environment.api.getCategories(1)
        if (result.kind === "ok") {
          self.saveCategories(result.categories, result.total, result.totalPages)
        } else {
          __DEV__ && console.tron.log(result.kind)
        }
      } catch (error) {
        __DEV__ && console.tron.log(error)
      }
    }),
    loadMoreCategories: flow(function*() {
      const result: any = yield self.environment.api.getCategories(self.currentPage + 1)
      if (result.kind === "ok") {
        self.mergeCategories(result.categories, result.total, result.totalPages)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
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

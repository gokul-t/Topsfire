import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import config from "../../config"
import { titleCase } from "../../utils"

/**
 * Model description here for TypeScript hints.
 */
export const CategoryModel = types
  .model("Category")
  .props({
    id: types.identifier,
    name: types.string,
    count: types.maybeNull(types.number),
    description: types.maybeNull(types.string),
    link: types.string,
    slug: types.string,
    taxonomy: types.string,
    parent: types.maybeNull(types.number),
  })
  .views(self => ({
    get formattedName() {
      return config.titleCase ? titleCase(self.name) : self.name
    },
    get formattedDescription() {
      return config.titleCase && self.description ? titleCase(self.description) : self.description
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type CategoryType = Instance<typeof CategoryModel>
export interface Category extends CategoryType {}
type CategorySnapshotType = SnapshotOut<typeof CategoryModel>
export interface CategorySnapshot extends CategorySnapshotType {}

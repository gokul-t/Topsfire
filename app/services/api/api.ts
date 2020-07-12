import { ApisauceInstance, create, ApiResponse } from "apisauce"
import WPAPI, { WPRequest } from "wpapi";
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import * as Models from "../../models"
import * as Utils from "../../utils"
import _ from "lodash";
/**
 * Manages all requests to the API.
 */

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance
  /**
   * The underlying WPAPI instrance which perform the requests
   */
  wp: WPAPI
  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.wp = new WPAPI({ endpoint: this.config.url });
  }

  /**
 * Gets a list of users.
 */
  async getCategories(page = 1): Promise<Types.GetCategoryResult> {
    // make the api call
    // transform the data into the format we are expecting
    const convertCategory = raw => {
      return {
        id: String(raw.id),
        name: raw.name,
        count: raw.count,
        description: raw.description,
        link: raw.link,
        slug: raw.slug,
        taxonomy: raw.taxonomy,
        parent: raw.parent
      }
    }
    try {
      // wp-json/wp/v2/categories?hide_empty=true&per_page=15
      const response: WPRequest = await this.wp.categories().param("hide_empty", "true").page(page).perPage(15);
      const rawCategories = response;
      const resultCategories: Models.CategorySnapshot[] = rawCategories.map(convertCategory)
      return {
        kind: "ok",
        categories: resultCategories,
        total: response._paging.total,
        totalPages: response._paging.totalPages
      }
    } catch (err) {
      __DEV__ && console.tron.log("getCategories", err);
      return { kind: "bad-data" }
    }
  }
  async getPosts({ categoryId, page }): Promise<Types.GetPostsResult> {

    const convertFeaturedMedia = (m, i) => {
      return ({
        medium: _.get(m,"media_details.sizes.medium.source_url"),
        large: _.get(m,"media_details.sizes.large.source_url"),
        thumbnail: _.get(m,"media_details.sizes.thumbnail.source_url"),
        source_url: _.get(m,"source_url")
      })
    }

    const convertPost = raw => {
      const featured_media = raw.featured_media ? raw._embedded["wp:featuredmedia"] : [];
      return {
        id: String(raw.id),
        date: raw.date,
        title: raw.title,
        content: raw.content,
        status: raw.status,
        featured_media: Array.isArray(featured_media) ? featured_media.map(convertFeaturedMedia) : [],
        categories: raw.categories
      }
    }

    try {
      const request = categoryId ? this.wp.posts().category(categoryId) : this.wp.posts();
      const response: WPRequest = await request.page(page).embed()
      const rawPosts = response;
      const resultPosts: Models.PostSnapshot[] = rawPosts.map(convertPost)
      return {
        kind: "ok",
        posts: resultPosts,
        total: response._paging.total,
        totalPages: response._paging.totalPages
      }
    } catch (err) {
      __DEV__ && console.tron.log("getPosts", err);
      return { kind: "bad-data" }
    }
  }


  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}

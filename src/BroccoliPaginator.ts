import axios from "axios";

interface PaginateAble {
  created_at: number
}

interface StringMap {
  [key: string]: string;
}

export default class BroccoliPaginator<T extends PaginateAble> {
  private readonly baseUrl: string;
  private readonly baseQueryParams: StringMap;
  private headTimestamp?: number;
  private tailTimestamp?: number;

  constructor(baseUrl: string, baseQueryParams: StringMap) {
    this.baseUrl = baseUrl;
    this.baseQueryParams = baseQueryParams;
  }

  public next(): Promise<T[]> {
    let params;
    if (this.tailTimestamp) {
      params = Object.assign(
        {},
        this.baseQueryParams,
        {from: this.tailTimestamp - 1},
      );
    } else {
      params = this.baseQueryParams;
    }
    return axios.get(this.baseUrl, {params})
      .then(res => res.data)
      .then(this.handleResponses);
  }

  public previous(): Promise<T[]> {
    let params;
    if (this.headTimestamp) {
      params = Object.assign(
        {},
        this.baseQueryParams,
        {to: this.headTimestamp + 1},
      );
    } else {
      params = this.baseQueryParams;
    }
    return axios.get(this.baseUrl, {params})
      .then(res => res.data)
      .then(this.handleResponses);
  }

  private handleResponses = (responses: T[]): T[] => {
    if (!responses || responses.length === 0) {
      return [];
    }
    this.headTimestamp = responses[0].created_at;
    this.tailTimestamp = responses[responses.length - 1].created_at;
    return responses;
  }
}

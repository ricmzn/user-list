export interface ReqresList<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class ReqresError extends Error {
  constructor(private response: Response, private resolvedJson: { error?: string }) {
    super(response.statusText);
  }

  get message() {
    return this.resolvedJson.error || this.response.statusText;
  }

  get status() {
    return this.response.status;
  }
}

export default class Reqres {
  static async request(path: string, options?: RequestInit) {
    const res = await fetch(`https://reqres.in/api/${path}?delay=2`, options);
    if (res.ok) {
      return res.json();
    } else {
      throw new ReqresError(res, await res.json());
    }
  }

  static async listUsers(): Promise<ReqresList<ReqresUser>> {
    return Reqres.request("users");
  }
}

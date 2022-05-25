export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
}

export interface ReqresUserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
}

export interface ReqresUserResponse {
  data: ReqresUser;
  support: {
    url: string;
    text: string;
  }
}

export interface ReqresUserPartial {
  name: string;
  job: string;
}

export interface ReqresUserPostResponse {
  id: number;
  name: string;
  job: string;
}

export class ReqresError extends Error {
  constructor(private response: Response, resolvedJson?: { error: string }) {
    super(resolvedJson?.error || `${response.status} ${response.statusText}`);
  }

  get status() {
    return this.response.status;
  }
}

export default class Reqres {
  static async request(path: string, options?: RequestInit) {
    const res = await fetch(`https://reqres.in/api/${path}`, options);
    if (res.ok) {
      if (res.headers.get("Content-Type")?.includes("json")) {
        return res.json();
      }
    } else {
      if (res.headers.get("Content-Type")?.includes("json")) {
        throw new ReqresError(res, await res.json());
      } else {
        throw new ReqresError(res);
      }
    }
  }

  static async listUsers(): Promise<ReqresUserListResponse> {
    return Reqres.request("users");
  }

  static async getUser(id: number): Promise<ReqresUserResponse> {
    return Reqres.request(`users/${id}`);
  }

  static async addUser(user: ReqresUserPartial): Promise<ReqresUserPostResponse> {
    return {
      // FIXME: a API não está devolvendo os parâmetros...
      ...user,
      ...await Reqres.request("users", { method: "POST", body: JSON.stringify(user) }),
    };
  }

  static async updateUser(id: number, user: ReqresUserPartial): Promise<ReqresUserPostResponse> {
    return {
      // FIXME: a API não está devolvendo os parâmetros...
      ...user,
      ...await Reqres.request(`users/${id}`, { method: "PUT", body: JSON.stringify(user) }),
    };
  }

  static async deleteUser(id: number): Promise<void> {
    return Reqres.request(`users/${id}`, { method: "DELETE" });
  }
}

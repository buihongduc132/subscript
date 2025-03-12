declare namespace Express {
  export interface Request<T = any> {
      user: any;
      body: T
  }
  // export interface Response {
  //     user: any;
  // }
}
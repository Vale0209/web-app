export default class Http<T> {

  private readonly baseURL : string = import.meta.env.VITE_BASE_URL || "http://localhost:3001";
  private readonly path : string;

  constructor(path: string) {
    this.path = path;
  };

  public async get() : Promise<T[] | undefined> {
    try {
      const data = await fetch(this.baseURL + this.path);
      return data.json();
    } catch (err) {
      console.error(err);
    };
  };

  public async getByID(id: string) : Promise<T | undefined> {
    try {
      const data = await fetch(this.baseURL + this.path + "/" + id);
      return data.json();
    } catch (err) {
      console.error(err);
    };
  };

  public async getByQuery(query:string, id: string) : Promise<T[] | undefined> {
    try {
      const data = await fetch(this.baseURL + this.path + query + id);
      return data.json();
    } catch (err) {
      console.error(err);
    };
  };

  public async updateByID(id: string, dataToSend: T) : Promise<T[] | undefined> {
    try {
      const data = await fetch(this.baseURL + this.path + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      console.log("Completed");

      return data.json();
    } catch (err) {
      console.error(err);
    };
  };



};
const sasRegex = /\bS[-,.]*A[-,.]*S\b/i;

export const isCompany = (name: string) : boolean => sasRegex.test(name);

export const firstLastInitialName = (name: string) =>{
  const nameData = name.toUpperCase().split(" ");

  const result = nameData.map( (name:string)=>name[0]);

  return [result[0], result[result.length-1]].join("");
};
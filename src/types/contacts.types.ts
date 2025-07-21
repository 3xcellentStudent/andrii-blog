export interface ContactsTypeWithSVG {
  $svg: ({ className }: { className: string; }) => React.JSX.Element
  source: ContactsTypeFromDb["source"];
  type: ContactsTypeFromDb["type"];
}
export interface ContactsTypeFromDb {
  source: string;
  type: "link" | "mailto";
}
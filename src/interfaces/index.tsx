export interface ObjectValues {
  [key: string]: any;
}
export interface onlyChildProps {
  children: React.ReactElement<any, any> | null;
}
export interface whereValue {
  field: string;
  condition: string;
  value: string | string[] | boolean | number;
}
export interface getDetailOfCollections {
  readonly collection_name: string;
  readonly count?: boolean;
  readonly docid?: string;
  readonly whereCond?: whereValue[];
  readonly reduxState?: string;
  readonly fieldName?: string;
  readonly user?: ObjectValues;
  readonly getLastData?: boolean;

  readonly order_By?: string;
  readonly field?: "asc" | "desc";
  readonly fetchOnly?: boolean;
  readonly getDetails?: getDetailOfCollections[];
}
export interface requestPropTypes {
  method: string;
  clear?: boolean;
  updateOn?: any;
  hideGlobalLoader?: boolean;
  sub_docid?: any;
  collection_name: string;
  order_By?: string;
  field?: "asc" | "desc";
  whereCond?: whereValue[];
  after?: ObjectValues;
  sub_collection_name?: string;
  before?: ObjectValues;
  fetchOnly?: boolean;
  limit?: string | number;
  docid?: string;
  merge?: boolean;
  data?: ObjectValues;
  dateCreationFields?: Array<string>;
  oldData?: ObjectValues[];
  UseThemeHelper?: any;
  getDetailOfCollections?: getDetailOfCollections[];
  fetchState?: any;
  reduxState?: string;
  routeId?: string;
  formatData?(data: any[]): any;
}
export type Language = "en" | "hi";

export type TranslationData = {
  [key in Language]: ObjectValues;
};
export interface inputProp {
  defaultValue?: { value?: string; id?: any };
  label: string;
  listFilter?(data: any): any;
  max?: number;
  min?: number;
  minDate?: any;
  maxDate?: any;
  doRefresh?(): void;
  button?: { onClick: any; label: any };
  checkMax?(data: any, ar?: any): any;
  grid?: any;
  fullWidth?: true;
  pinned?: true;
  api?: string;
  not_send_id?: true;
  placeholder?: string;
  only_number?: true;
  multiple?: true;
  value: any;
  dontsendid?: any;
  border?: any;
  autoFocus?: boolean;
  //  string|ObjectValues;
  error: boolean;
  helperText: string;
  onChange?: any;
  onUpdate?: any;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  type?: "password";
  fieldType?:
    | "text"
    | "select"
    | "cktextEditor"
    | "autocomplete"
    | "date"
    | "file"
    | "extra"
    | "image"
    | "checkbox"
    | "radio";
  multiline?: number;
  list?: ObjectValues[];
  disabled?: boolean;
  not_required?: true;
  listLabel?: string;
  freeSolo?: {
    dialog?: boolean;
    content?: ObjectValues;
    addText?: string;
  };
  dataType?: "number" | "option"|"text";
  validate?(data: any, data1?: any): any;
  showhelperText?: any;
  newValueCheck?: any;
  updateError?(data: any): void;
}

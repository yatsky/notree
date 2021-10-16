import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class AppData {
  readonly id: string;
  readonly content: string;
  readonly owner?: string;
  constructor(init: ModelInit<AppData>);
  static copyOf(
    source: AppData,
    mutator: (draft: MutableModel<AppData>) => MutableModel<AppData> | void
  ): AppData;
}

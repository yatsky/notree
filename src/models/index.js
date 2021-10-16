// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { AppData } = initSchema(schema);

export { AppData };

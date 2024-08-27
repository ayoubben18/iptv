// NOTE : this function is used to handle the status of the response from the server
// it is better to use this function to handle errors so you control when you throw an error
// decrease the redandency of the code

import { PostgrestError } from "@supabase/supabase-js";

import { CustomError } from "./errors";
import { CustomErrorEnums } from "@/enums/errors.enum";
import logger from "./logger";

export const handleStatus = <T>(
  status: number,
  data: T | T[],
  error: PostgrestError | null,
) => {
  switch (status) {
    case 200:
    case 201:
      if (!data) {
        return;
      }
      if (Array.isArray(data)) {
        return data as T[];
      }
      return data as T;
    case 406:
    case 404:
      return null;
    default:
      logger.error(CustomErrorEnums.DatabaseError, { error });

      throw new CustomError(
        error!.message,
        CustomErrorEnums.DatabaseError,
        status,
      );
  }
};

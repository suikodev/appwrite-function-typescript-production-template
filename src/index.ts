function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

/**
 * https://appwrite.io/docs/functions#functionVariables
 */
type AppwriteVariables =
  | "APPWRITE_FUNCTION_ID"
  | "APPWRITE_FUNCTION_NAME"
  | "APPWRITE_FUNCTION_DEPLOYMENT"
  | "APPWRITE_FUNCTION_TRIGGER"
  | "APPWRITE_FUNCTION_RUNTIME_NAME"
  | "APPWRITE_FUNCTION_RUNTIME_VERSION"
  | "APPWRITE_FUNCTION_EVENT"
  | "APPWRITE_FUNCTION_EVENT_DATA"
  | "APPWRITE_FUNCTION_DATA"
  | "APPWRITE_FUNCTION_PROJECT_ID"
  | "APPWRITE_FUNCTION_USER_ID"
  | "APPWRITE_FUNCTION_JWT";

type AppwriteResponse = {
  send: (text: string, status?: number) => void;
  json: (obj: Record<string, unknown>, status?: number) => void;
};

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/
export default async function (
  req: {
    headers: Record<string, string>;
    payload: string;
    variables: Record<AppwriteVariables, string>;
  },
  res: AppwriteResponse
) {
  const userId = parseJwt(req.variables.APPWRITE_FUNCTION_JWT).userId;

  res.json({ message: `Hello ${userId}` });
}

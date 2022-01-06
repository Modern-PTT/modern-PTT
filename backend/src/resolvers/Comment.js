import { getLocation } from "../utilities/converter";

const Comment = {
  location(parent, args, { db }, info) {
    return getLocation(parent.ip);
  },
};

export { Comment as default };

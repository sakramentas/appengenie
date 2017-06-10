export const IssueModel =
  ({
    key = null,
    body = null,
    edited = false,
    editedBy = null,
    editedLast = null,
    userId = null,
    likes = null,
    createdAt = null,
    appData = {}
  }) => {
  return {
    key,
    body,
    edited,
    editedBy,
    editedLast,
    userId,
    likes,
    createdAt,
    appData
  }
};


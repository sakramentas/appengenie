export const AnswerModel =
  ({
    key = null,
    body = null,
    appName = null,
    edited = false,
    editedBy = null,
    editedLast = null,
    user = {},
    likes = null,
    createdAt = null,
    issueId = null
  }) => {
  return {
    key,
    body,
    appName,
    edited,
    editedBy,
    editedLast,
    user,
    likes,
    createdAt,
    issueId
  }
};


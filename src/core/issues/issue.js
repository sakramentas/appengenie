export const IssueModel = ({completed = false, key = null, title = null, details = null}) => {
  return {
    completed,
    key,
    title,
    details
  }
};


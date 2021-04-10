// eslint-disable-next-line prefer-regex-literals
export const domainNameRegex = new RegExp(
  '^((?:http(?:s)?:\\/\\/)?(?:www\\.)?)(?:([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])\\.)*([A-Za-z0-9]{2,20})'
)

export const domainNameFromUrl = (url: string): string => {
  const match = domainNameRegex.exec(url)
  return match ? `${match[2]}.${match[3]}` : ''
}

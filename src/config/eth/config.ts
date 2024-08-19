export function ethDerivePath(account: number): string {
  return `m/39'/60'/${account}'/0'`;
}
export function ethDerivePath(account: number): string {
  return `m/44'/60'/${account}'/0'`;
}

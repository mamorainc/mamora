import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Token } from "@/types/wallet";

interface TokensListProps {
  tokens: Token[];
}

export function TokensList({ tokens }: TokensListProps) {
  if (tokens.length === 0) {
    return <div className="py-8 text-center">No tokens found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token, index) => (
          <TableRow key={index}>
            <TableCell>{token.name}</TableCell>
            <TableCell>{token.symbol}</TableCell>
            <TableCell>{token.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

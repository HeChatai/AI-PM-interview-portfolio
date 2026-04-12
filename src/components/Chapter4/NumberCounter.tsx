// src/components/Chapter4/NumberCounter.tsx

interface NumberCounterProps {
  value: number | string;
  duration?: number;
  delay?: number;
  suffix?: string;
  decimals?: number;
}

export const NumberCounter = ({
  value,
  suffix = '',
  decimals = 0
}: NumberCounterProps) => {
  // Parse numeric value
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value));
  const isNumeric = !isNaN(numericValue);

  // For non-numeric values, just display the text
  if (!isNumeric) {
    return <span>{value}{suffix}</span>;
  }

  // Format numeric value
  const formatted = numericValue.toFixed(decimals);
  return <span>{formatted}{suffix}</span>;
};

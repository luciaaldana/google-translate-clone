import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';

type Props = {
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
  type: SectionType;
};

const commonStyle = {
  border: 0,
  height: '200px',
  resizeBy: 'none',
};

const getPleaceholder = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
  if (type === SectionType.From) {
    return 'Enter text';
  }
  if (loading === true) {
    return 'Translating...';
  }
  return 'Translate';
};

const TextArea = ({ loading, value, onChange, type }: Props) => {
  const styles = type === SectionType.From ? commonStyle : { ...commonStyle, backgroundColor: '#f5f5f5' };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPleaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextArea;

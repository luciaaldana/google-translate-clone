import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { SectionType, type FromLanguage, type Language } from '../types.d';

type Props =
  | { type: SectionType; value: FromLanguage; onChange: (language: FromLanguage) => void }
  | { type: SectionType; value: Language; onChange: (language: Language) => void };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select aria-label="Select the language" onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>
  );
};

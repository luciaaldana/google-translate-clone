import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css';
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import TextArea from './components/TextArea';

function App() {
  const {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  return (
    <Container fluid>
      <h1>Google translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector onChange={setFromLanguage} type={SectionType.From} value={fromLanguage} />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector onChange={setToLanguage} type={SectionType.To} value={toLanguage} />
            <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

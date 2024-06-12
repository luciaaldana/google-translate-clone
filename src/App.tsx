import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { useStore } from './hooks/useStore';
import { useDebounce } from './hooks/useDebounce';
import { translate } from './services/translate';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import TextArea from './components/TextArea';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants';
import { SectionType } from './types.d';
import './App.css';

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

  const debouncedFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (debouncedFromText === '') return;
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        // In typescript the == to null compares whether the value is null or undefined
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult('Error');
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

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
            <div style={{ position: 'relative' }}>
              <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

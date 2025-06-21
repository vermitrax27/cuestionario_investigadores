import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Home, Microscope, Database } from 'lucide-react';

// Interfaces para los tipos de componentes
interface BackButtonProps {
  onClick: () => void;
}

interface QuestionCardProps {
  title: string;
  children: React.ReactNode;
  helpText: string;
}

interface AnswerButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'warning';
}

interface ResultCardProps {
  title: string;
  type: 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode; // ← Cambiado a opcional con ?
  nextSteps?: string[];
  profile?: string;
}

const FlujoInvestigadores = () => {
  const [currentStep, setCurrentStep] = useState<string>('inicio');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFactors, setShowFactors] = useState<boolean>(false);

  // Usar la variable answers para evitar el error TS6133
  console.log('Current answers:', answers);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Lógica de navegación según las respuestas
    switch (questionId) {
      case 'q1_1':
        if (answer === 'no') {
          setCurrentStep('fin_anonimo');
        } else {
          setCurrentStep('q1_2');
        }
        break;
      case 'q1_2':
        if (answer === 'no') {
          setCurrentStep('fin_territorial');
        } else {
          setCurrentStep('q2_1');
        }
        break;
      case 'q2_1':
        if (answer === 'si') {
          setCurrentStep('q3_1');
        } else if (answer === 'no') {
          setCurrentStep('q4_1');
        } else {
          setShowFactors(true);
        }
        break;
      case 'q3_1':
        if (answer === 'si') {
          setCurrentStep('resultado_b');
        } else {
          setCurrentStep('q3_2');
        }
        break;
      case 'q3_2':
        if (answer === 'si') {
          setCurrentStep('resultado_b');
        } else {
          setCurrentStep('q3_3');
        }
        break;
      case 'q3_3':
        if (answer === 'si') {
          setCurrentStep('resultado_b');
        } else {
          setCurrentStep('resultado_a');
        }
        break;
      case 'q4_1':
        if (answer === 'si') {
          setCurrentStep('resultado_c');
        } else {
          setCurrentStep('resultado_e');
        }
        break;
    }
  };

  const resetFlow = () => {
    setCurrentStep('inicio');
    setAnswers({});
    setShowFactors(false);
  };

  const BackButton = ({ onClick }: BackButtonProps) => (
    <button 
      onClick={onClick}
      className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Volver
    </button>
  );

  const QuestionCard = ({ title, children, helpText }: QuestionCardProps) => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-start mb-4">
        <Microscope className="w-6 h-6 text-blue-600 mr-3 mt-1" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
      {helpText && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start">
            <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Ayuda:</strong> {helpText}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AnswerButton = ({ onClick, children, variant = 'primary' }: AnswerButtonProps) => {
    const baseClasses = "w-full p-4 rounded-lg font-medium transition-colors mb-3 text-left";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600"
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  const ResultCard = ({ title, type, children, nextSteps, profile }: ResultCardProps) => {
    const typeStyles = {
      success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, color: 'text-green-600' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle, color: 'text-yellow-600' },
      error: { bg: 'bg-red-50', border: 'border-red-200', icon: XCircle, color: 'text-red-600' },
      info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Database, color: 'text-blue-600' }
    };
    
    const style = typeStyles[type];
    const Icon = style.icon;
    
    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-6 max-w-4xl mx-auto`}>
        <div className="flex items-start mb-4">
          <Icon className={`w-6 h-6 ${style.color} mr-3 mt-1`} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            
            {profile && (
              <div className="bg-white p-4 rounded-lg mb-4 border-l-4 border-blue-400">
                <h3 className="font-semibold text-gray-800 mb-2">Su Perfil:</h3>
                <p className="text-gray-700 text-sm">{profile}</p>
              </div>
            )}
            
            {children && (
              <div className="text-gray-700 mb-4">{children}</div>
            )}
            
            {nextSteps && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Próximos Pasos:</h3>
                <ul className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-gray-600 mr-2 mt-1" />
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={resetFlow}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Evaluar nuevo proyecto
        </button>
      </div>
    );
  };

  // Componente principal de renderizado
  const renderStep = () => {
    switch (currentStep) {
      case 'inicio':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Microscope className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">
                Flujo Interactivo para Investigadores: Determinación de Rol Bajo la Ley 21.719
              </h1>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Contexto Específico:</strong> Este flujo está diseñado para investigadores y organizaciones 
                de investigación que utilizan datos personales en proyectos científicos. Reconoce que los datos 
                pueden tener un ciclo de vida con diferentes etapas y responsables.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium mb-2">Aviso Legal Importante</p>
                  <p className="text-yellow-700 text-sm">
                    Esta es una herramienta de orientación avanzada y no reemplaza la asesoría legal de un 
                    abogado experto en protección de datos y derecho de la investigación. Las conclusiones 
                    son orientativas y deben ser validadas.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Este análisis se basa en un enfoque por fases, reconociendo que un hospital puede ser responsable 
              de la recolección inicial de datos para atención de pacientes, pero su rol puede ser diferente 
              cuando esos mismos datos se utilizan en un proyecto de investigación posterior.
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800 text-sm">
                <strong>Enfoque:</strong> Este cuestionario se centra en definir su rol para el proyecto de 
                investigación específico que usted está llevando a cabo.
              </p>
            </div>

            <AnswerButton onClick={() => setCurrentStep('q1_1')}>
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Comenzar evaluación del proyecto de investigación
              </div>
            </AnswerButton>
          </div>
        );

      case 'q1_1':
        return (
          <QuestionCard 
            title="PASO 1: APLICABILIDAD - Pregunta 1.1"
            helpText="Un 'dato personal' es cualquier información sobre una persona natural identificada o identificable. Esto incluye datos seudonimizados (donde los identificadores directos se reemplazan por un código), que son comunes en investigación y siguen siendo considerados datos personales. Los datos completa e irreversiblemente anonimizados no son datos personales."
          >
            <p className="text-gray-700 mb-6">
              ¿Los datos que utilizará en su proyecto de investigación son <strong>"datos personales"</strong>?
            </p>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'si')}>
              SÍ - Utilizamos datos personales (incluye datos seudonimizados)
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'no')} variant="secondary">
              NO - Los datos son totalmente anónimos
            </AnswerButton>
          </QuestionCard>
        );

      case 'q1_2':
        return (
          <QuestionCard 
            title="PASO 1: APLICABILIDAD - Pregunta 1.2"
            helpText="¿Su institución está en Chile? ¿El proveedor de datos está en Chile? ¿Su investigación monitorea a personas en Chile?"
          >
            <BackButton onClick={() => setCurrentStep('q1_1')} />
            <p className="text-gray-700 mb-6">
              ¿Su proyecto de investigación cumple al menos una de las <strong>condiciones de aplicación territorial</strong> de la Ley 21.719?
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Su institución de investigación está establecida en Chile</li>
              <li>El proveedor de datos está establecido en Chile</li>
              <li>Su investigación monitorea el comportamiento de personas que están en Chile</li>
            </ul>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'si')}>
              SÍ - Cumple al menos una condición territorial
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'no')} variant="secondary">
              NO - No cumple ninguna condición territorial
            </AnswerButton>
          </QuestionCard>
        );

      case 'q2_1':
        return (
          <QuestionCard 
            title="PASO 2: EL MOTOR DE LA INVESTIGACIÓN - Pregunta 2.1"
            helpText="La prueba para ser Responsable es determinar el 'porqué' y el 'cómo' del tratamiento. En investigación significa: definir la pregunta de investigación Y tomar decisiones clave sobre metodología (qué variables, criterios de inclusión/exclusión, métodos de análisis, período de tiempo, qué colaboradores tendrán acceso)."
          >
            <BackButton onClick={() => setCurrentStep('q1_2')} />
            <p className="text-gray-700 mb-6">
              Para este proyecto de investigación específico, ¿es su organización (como "usuario de datos") la que define el 
              <strong> propósito de la investigación</strong> (la pregunta o hipótesis científica) Y los <strong>medios esenciales</strong> para responderla?
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Los medios esenciales incluyen decidir sobre:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Qué variables o tipos de datos específicos se necesitan</li>
                <li>• Los criterios de inclusión/exclusión de los sujetos</li>
                <li>• Los métodos de análisis estadístico o bioinformático</li>
                <li>• El período de tiempo que necesitará los datos</li>
                <li>• Qué colaboradores tendrán acceso a los datos</li>
              </ul>
            </div>

            <AnswerButton onClick={() => handleAnswer('q2_1', 'si')}>
              SÍ - Definimos tanto el propósito como los medios esenciales
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'no')} variant="secondary">
              NO - No definimos ambos aspectos
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'nosé')} variant="warning">
              NO SÉ - No estoy seguro sobre quién decide
            </AnswerButton>
            
            {showFactors && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Factores para ayudar a decidir:</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li><strong>Iniciativa y Diseño:</strong> ¿Quién redactó el protocolo de investigación? ¿Quién diseñó la metodología?</li>
                  <li><strong>Independencia Científica:</strong> ¿Su organización tiene libertad académica para llevar a cabo la investigación?</li>
                  <li><strong>Resultados y Publicación:</strong> ¿Su organización generará los resultados y los publicará?</li>
                  <li><strong>Rendición de Cuentas:</strong> ¿Ante quién responde por el éxito o fracaso científico del proyecto?</li>
                </ul>
                <p className="mt-3 text-sm text-blue-600">
                  Después de reflexionar, vuelva a responder la pregunta principal.
                </p>
              </div>
            )}
          </QuestionCard>
        );

      case 'q3_1':
        return (
          <QuestionCard 
            title="PASO 3: ANÁLISIS DEL PROVEEDOR DE DATOS - Pregunta 3.1"
            helpText="No se refiere a que el proveedor verifique que su proyecto sea ético o científicamente sólido (eso es parte de su propia diligencia). Se refiere a que el proveedor colabore en definir las preguntas, variables o métodos de su proyecto."
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              Más allá de entregar los datos y exigirle cumplir con la ley, ¿el <strong>proveedor de datos</strong> 
              (ej. hospital, biobanco) participa activamente en el <strong>diseño y la metodología</strong> de su protocolo de investigación?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'si')}>
              SÍ - El proveedor colabora en el diseño del proyecto
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'no')} variant="secondary">
              NO - Solo nos entrega los datos
            </AnswerButton>
          </QuestionCard>
        );

      case 'q3_2':
        return (
          <QuestionCard 
            title="PASO 3: ANÁLISIS DEL PROVEEDOR DE DATOS - Pregunta 3.2"
            helpText="Esto es un indicador potente de que el proveedor tiene un propósito propio, inextricablemente ligado al suyo. No confundir con el mero pago de una tarifa de acceso a los datos, ni con la simple exigencia de ser 'reconocido' en las publicaciones."
          >
            <BackButton onClick={() => setCurrentStep('q3_1')} />
            <p className="text-gray-700 mb-6">
              Como condición para darle acceso a los datos, ¿el proveedor le exige una <strong>participación en los beneficios económicos</strong> 
              o <strong>derechos de propiedad intelectual (PI)</strong> que se generen a partir de los resultados de su investigación?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_2', 'si')}>
              SÍ - Exige participación en beneficios económicos o PI
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_2', 'no')} variant="secondary">
              NO - Solo pago de tarifa de acceso o reconocimiento
            </AnswerButton>
          </QuestionCard>
        );

      case 'q3_3':
        return (
          <QuestionCard 
            title="PASO 3: ANÁLISIS DEL PROVEEDOR DE DATOS - Pregunta 3.3"
            helpText="Este requerimiento puede indicar un propósito propio del proveedor para enriquecer sus activos de datos, lo que lo vincularía a su proyecto."
          >
            <BackButton onClick={() => setCurrentStep('q3_2')} />
            <p className="text-gray-700 mb-6">
              Como condición de acceso, ¿el proveedor le exige que le <strong>devuelva los datos enriquecidos</strong> 
              (ej. datos clínicos estructurados, secuencias genómicas anotadas) para que él pueda explotarlos en sus 
              propios proyectos futuros o con otros fines comerciales o científicos propios?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_3', 'si')}>
              SÍ - Exige devolución de datos enriquecidos
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_3', 'no')} variant="secondary">
              NO - No exige devolución de datos enriquecidos
            </AnswerButton>
          </QuestionCard>
        );

      case 'q4_1':
        return (
          <QuestionCard 
            title="PASO 4: ANÁLISIS DEL ROL DE ENCARGADO - Pregunta 4.1"
            helpText="Ejemplos: Un investigador le entrega datos y le pide ejecutar un análisis bioinformático específico, sin que usted decida sobre la pregunta de investigación. O usted provee un entorno de procesamiento seguro donde el investigador principal accede y analiza los datos."
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              ¿Su rol se limita a <strong>prestar un servicio técnico o analítico</strong> a otra organización de investigación 
              (el Responsable), siguiendo estrictamente sus instrucciones?
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_1', 'si')}>
              SÍ - Prestamos servicio técnico siguiendo instrucciones
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_1', 'no')} variant="secondary">
              NO - Nuestro rol no se limita a seguir instrucciones
            </AnswerButton>
          </QuestionCard>
        );

      // Resultados finales
      case 'fin_anonimo':
        return (
          <ResultCard 
            title="FIN DEL FLUJO - Datos Anónimos" 
            type="info"
          >
            <p>
              Si trabaja exclusivamente con datos anonimizados, las principales obligaciones de la Ley 21.719 
              no aplican a su proyecto. Puede proceder con su investigación, asegurándose de que la anonimización 
              sea robusta y permanente.
            </p>
          </ResultCard>
        );

      case 'fin_territorial':
        return (
          <ResultCard 
            title="FIN DEL FLUJO - Fuera del Ámbito Territorial" 
            type="info"
          >
            <p>
              Es posible que la ley chilena no le aplique por razones territoriales, pero podría estar sujeto 
              a otras legislaciones (ej. RGPD en Europa). Consulte a un experto en derecho internacional de datos.
            </p>
          </ResultCard>
        );

      case 'resultado_a':
        return (
          <ResultCard 
            title="RESPONSABLE ÚNICO DEL PROYECTO DE INVESTIGACIÓN" 
            type="success"
            profile="Usted (o su institución) es el 'usuario de datos' y el único responsable del tratamiento para los fines de su proyecto de investigación. La entidad que le proveyó los datos es un 'proveedor de datos' que actúa como un responsable separado en una fase previa y no es responsable de su proyecto."
            nextSteps={[
              "Cumplir con todas las obligaciones de un responsable bajo la Ley 21.719, especialmente el Principio de Finalidad (Art. 3(b))",
              "Asegurar el cumplimiento del Principio de Responsabilidad (Art. 3(e)), siendo capaz de demostrar el cumplimiento",
              "Si el tratamiento se basa en el interés legítimo (Art. 16 quinquies), adoptar medidas de calidad y seguridad adecuadas",
              "Firmar un 'Acuerdo de Transferencia de Datos' o 'Acuerdo de Uso de Datos' con el proveedor"
            ]}
          />
        );

      case 'resultado_b':
        return (
          <ResultCard 
            title="CORRESPONSABLE DEL PROYECTO DE INVESTIGACIÓN" 
            type="success"
            profile="Usted y el 'proveedor de datos' son corresponsables (controladores conjuntos) porque ambos participan de forma decisiva en el diseño del proyecto o en sus resultados (PI, datos enriquecidos)."
            nextSteps={[
              "Obligatorio: Establecer un acuerdo de corresponsabilidad claro y por escrito",
              "El acuerdo debe definir quién es responsable de qué (quién informa al titular, quién responde a solicitudes, etc.)",
              "El acuerdo debe ser transparente para los titulares de los datos",
              "Ambas partes son solidariamente responsables por los daños, por lo que la coordinación es crucial"
            ]}
          />
        );

      case 'resultado_c':
        return (
          <ResultCard 
            title="ENCARGADO (PROCESADOR) DEL TRATAMIENTO PARA LA INVESTIGACIÓN" 
            type="success"
            profile="Usted presta un servicio a un Responsable (el investigador principal o su institución). No tiene poder de decisión sobre los fines y medios esenciales del proyecto."
            nextSteps={[
              "Su relación debe estar regida por un contrato de mandato (Acuerdo de Tratamiento de Datos) que cumpla con el Artículo 15 bis",
              "El contrato debe especificar que sólo puede actuar bajo instrucciones documentadas",
              "Debe implementar las medidas de seguridad requeridas y mantener la confidencialidad",
              "No puede usar los datos para fines propios sin autorización expresa"
            ]}
          />
        );

      case 'resultado_d':
        return (
          <ResultCard 
            title="ROL HÍBRIDO Y POTENCIAL INFRACCIÓN" 
            type="warning"
            profile="Actúa como Encargado para una tarea específica, pero luego usa los datos para un proyecto de investigación propio. En ese momento, se convierte en Responsable de ese nuevo tratamiento."
            nextSteps={[
              "Debe obtener una base de licitud válida para su propio proyecto de investigación",
              "Usar datos recibidos como Encargado para un fin propio no autorizado es una infracción grave",
              "Puede anular la licitud de su proyecto desde el inicio - se requiere máxima precaución",
              "Buscar asesoría legal inmediata antes de proceder"
            ]}
          />
        );

      case 'resultado_e':
        return (
          <ResultCard 
            title="ROL INDETERMINADO - ALTO RIESGO" 
            type="error"
            profile="Sus respuestas no permiten una clasificación clara. Esta ambigüedad es un riesgo legal y operativo muy alto en el contexto de la investigación científica."
            nextSteps={[
              "Acción Urgente: Buscar asesoría legal especializada para definir y documentar su rol",
              "NO iniciar el tratamiento de datos hasta que su rol esté claramente definido",
              "La falta de claridad puede invalidar la base legal de todo su proyecto de investigación",
              "Documentar todas las relaciones y acuerdos con las partes involucradas"
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default FlujoInvestigadores;
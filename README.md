Documentação do Projeto Cadence: Plataforma de Teleconsultas

Introdução O projeto Cadence, originalmente concebido como uma plataforma de colaboração e gestão de projetos, será pivotado para uma Plataforma de Teleconsultas. Esta adaptação visa responder à crescente demanda por soluções de saúde digitais, permitindo que profissionais de saúde e pacientes se conectem de forma segura e eficiente através de vídeo-chamadas, agendamentos online e gestão de registos.

O Problema e a Oportunidade A pandemia e a evolução tecnológica aceleraram a digitalização da saúde. Há uma clara necessidade de:

Acessibilidade: Consultas médicas sem barreiras geográficas ou de mobilidade.

Conveniência: Agendamentos flexíveis e redução do tempo de espera.

Eficiência: Otimização da gestão de consultórios e tempo dos profissionais.

Segurança: Plataformas seguras para a troca de informações sensíveis.

O Cadence tem a oportunidade de se posicionar como uma ferramenta robusta e intuitiva para teleconsultas.

Visão da Nova Plataforma Cadence (Teleconsultas) A nova visão do Cadence é ser uma plataforma abrangente que facilita todo o ciclo de uma teleconsulta: desde o agendamento, passando pela realização da vídeo-chamada, até à gestão pós-consulta (notas, receitas, etc.).
3.1. Adaptação das Secções Existentes: Dashboard:

Original: Visão geral de projetos, tarefas e atividades da equipa.

Adaptação: Visão geral para o profissional de saúde (próximas consultas, pacientes em espera, sumário de atividade diária/semanal) e para o paciente (próximas consultas, histórico, acesso rápido a clínicas/especialidades).

Conversas (Chat):

Original: Chat para comunicação interna da equipa.

Adaptação: Chat seguro entre paciente e profissional (pré/pós-consulta), chat interno para equipas médicas (ex: departamento de cardiologia).

Reuniões:

Original: Agendamento e gestão de reuniões internas.

Adaptação: Núcleo da Teleconsulta. Agendamento de consultas (com integração de calendário), realização de vídeo-chamadas seguras e com funcionalidades essenciais (partilha de ecrã, anexos, gravação opcional).

Comunidades:

Original: Grupos de interesse ou equipas de projeto.

Adaptação: Clínicas, Departamentos Médicos ou Especialidades. Uma forma de os utilizadores (pacientes) explorarem e se conectarem com diferentes áreas da saúde ou instituições. Cada "comunidade" pode representar uma clínica ou uma especialidade médica.

Calendário:

Original: Calendário de equipa e projetos.

Adaptação: Calendário de agendamentos de consultas para profissionais (disponibilidade, bloqueios) e pacientes (visualização das suas consultas agendadas).

Atividade:

Original: Feed de atividades da plataforma.

Adaptação: Registo de atividades relacionadas com consultas (agendamentos, conclusões, mensagens).

Código:

Original: Gestão de repositórios de código.

Adaptação: Esta funcionalidade será removida ou desativada na versão de teleconsultas, pois não se alinha com o novo propósito do produto final para o utilizador.

Prototipagem Assistida por IA O processo de desenvolvimento inicial está a ser acelerado através de prototipagem assistida por IA, permitindo uma rápida iteração e validação de conceitos.
4.1. Desafios e Soluções (Exemplos): Adaptação de Componentes: Componentes como o CommunityCard foram adaptados para representar "Clínicas/Especialidades" com imagens dinâmicas e descrições relevantes, reutilizando a estrutura de UI existente.

Integração de Ícones: Desafios com a importação de ícones específicos (SquareTerminal, Code, Hospital) da biblioteca lucide-react foram resolvidos através da substituição por ícones alternativos que funcionam (Monitor, FileCode, Users) para garantir a funcionalidade sem bloquear o desenvolvimento.

Manutenção da Consistência: Assegurar que a transição de termos e conceitos (ex: "Comunidades" para "Clínicas e Especialidades") é consistente em toda a UI e na base de código.



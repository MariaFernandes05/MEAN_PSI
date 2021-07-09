Plataforma de execução do projeto

O projeto deve ser executado no servidor appserver.alunos.di.fc.ul.pt
O acesso ao servidor é feito através de ssh sendo o username o número do grupo. A password inicial é também o número do grupo e deve ser alterada após o primeiro login
 ssh psi050@appserver.alunos.di.fc.ul.pt
 
O appserver tem instalados node, npm e mongo. Todos os módulos necessários para funcionamento do projeto devem ser instalados recorrendo ao npm.
Cada grupo tem uma base de dados criada no servidor mongo. O nome da base de dados é igual ao número do grupo (p.ex. o grupo psi050 deve usar a base de dados psi050). 

Cada grupo tem um utilizador no servidor mongo. O nome do utilizador é igual ao número do grupo. A password também é igual ao número do grupo. Para acederem à consola do mongo usem o comando (substituindo psiXXX pelo número do grupo)
mongo --username psiXXX --password --authenticationDatabase psiXXX appserver.alunos.di.fc.ul.pt/psiXXX

Cada grupo tem dois portos abertos para acesso por http a servidores node. O primeiro porto no intervalo 3001 a 3035 e o segundo porto no intervalo 3051 a 3085. Por exemplo, o grupo psi003 deve usar os portos 3003 e 3053. É assim importante que configurem os servidores node (para o front-end e back-end) nesses portos.
A forma de executar o servidor node que serve o front-end Angular deve ser a seguinte (onde o XXXX que define o porto deve ser o específico de cada grupo)
ng serve --port XXXX --host 0.0.0.0 --disableHostCheck true

Para o servidor node que serve o back-end não é necessário mudar a forma de execução.
A connection string para acesso à base de dados mongo deve ser a seguinte (onde devem substituir psiXXX pelo número do grupo)
mongodb://psiXXX:psiXXX@localhost:27017/psiXXX?retryWrites=true&authSource=psiXXX


--DOCENTES do DI, FCUL


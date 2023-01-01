## Pesquisa por Criteria no Spring Boot + MetaModel ##

1. Criar um método pesquisar no pacote Resource da Classe
   1. Passar como parâmetro um tipo da ClasseFilter, ex:

2. Criar a ClasseFilter
   1. adicionar os atributos pela qual deseja realizar a pesquisa, ex:

3. Criar em um novo pacote uma intefarce com o nome ClasseRepositoryQuery
   1. na classe ClasseRepository extender a ClasseRepositoryQuery, ex:

4. Criar uma classe de implementação com o nome ClasseRepositoryImpl
   1. implementar a interface criada ClasseRepositoryQuery, ex:
   2. injetar o EntityManager com a anotação @PersistenceContext, ex:
   3. criar os métodos de busca com as regras do Criteria do JPA, ex:
   4. criar as restrições com o Predicate[]
   5. criar um método criarRestricoes recebendo como parâmetro ClasseFilter, CriteriaBuilder, Root<ClasseFilter>
   6. criar um List de Predicate e retornar um Array de Predicate, ex:

5. Criar um MetaModel para a entidade
   1. no STS, botão direito em cima do projeto -> Properties
   2. Java Compiler -> Annotation Processing
   3. Enable project specific settings
   4. Generated source directory -> src/main/java
   5. na aba esquerda Factory Path -> Enable project specific settings
   6. clicar em adicionar um jar externo
   7. procurar no dirétorio abaixo o jar
   8. C:\Users\nomeDoUsuario\.m2\repository\org\hibernate\hibernate-jpamodelgen\5.4.31.Final
   9. se caso não existir o jpamodelgen -> adicionar a dependência jpamodelgen no pom.xml
   10. clicar em Apply -> Apply and Close e aceitar o rebuild

6. Voltar na classe de implementação -> ClasseRepositoryImpl
  1. trocar as strings com os nomes dos campos pela Classe do MetaModel

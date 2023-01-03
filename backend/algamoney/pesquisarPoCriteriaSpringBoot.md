## Pesquisa por Criteria no Spring Boot + MetaModel ##

1. Criar um método pesquisar no pacote Resource da Classe
   1. Passar como parâmetro um tipo da ClasseFilter, ex:
   ![1 1](https://user-images.githubusercontent.com/50461475/210183944-31d2fd17-0cac-402f-89ae-c8204877aecf.png)

2. Criar a ClasseFilter
   1. adicionar os atributos pela qual deseja realizar a pesquisa, ex:
   ![2 1](https://user-images.githubusercontent.com/50461475/210183945-d2ff7a33-3cf3-4da9-b129-00aabb89a3e9.png)

3. Criar em um novo pacote uma intefarce com o nome ClasseRepositoryQuery
   1. na classe ClasseRepository extender a ClasseRepositoryQuery, ex:
   ![3 1](https://user-images.githubusercontent.com/50461475/210183942-679dbece-0d27-40c4-814a-bd68120ee766.png)
   
   2. na interface ClasseRepositoryQuery criar um método de pesquisa recebendo a ClasseFilter
   ![3 2](https://user-images.githubusercontent.com/50461475/210183941-696d2be8-a391-4c07-b64c-b16880705611.png)

   3. na classe do Resource ClasseResoure chamar o novo método de pesquisa passando a ClasseFilter
   ![3 3](https://user-images.githubusercontent.com/50461475/210183943-3331cb66-cb76-4e0c-a157-885b992c1d9f.png)

4. Criar uma classe de implementação com o nome ClasseRepositoryImpl
   1. implementar a interface criada ClasseRepositoryQuery, ex:
   ![4 1](https://user-images.githubusercontent.com/50461475/210439523-745fd1de-e0bd-45d2-92ee-9d110c1bf6f0.png)
   
   2. injetar o EntityManager com a anotação @PersistenceContext, ex:
   ![4 2](https://user-images.githubusercontent.com/50461475/210439525-938c20f4-5f3e-48ff-863b-b3f9cc1ff79d.png)
   
   3. criar os métodos de busca com as regras do Criteria do JPA, ex:
   ![4 3](https://user-images.githubusercontent.com/50461475/210439526-7e6d5e43-2ffd-419b-816a-929fbb819d1a.png)
   
   4. criar as restrições com o Predicate[], ex:
   ![4 4](https://user-images.githubusercontent.com/50461475/210439527-e82f48df-4ec5-40e8-97d7-9de98ffbdc21.png)
   
   5. criar um método criarRestricoes recebendo como parâmetro ClasseFilter, CriteriaBuilder, Root<ClasseFilter>, ex:
   ![4 5](https://user-images.githubusercontent.com/50461475/210439530-a48935cf-c232-41c6-966a-2d8201935bfb.png)
   
   6. criar um List de Predicate e retornar um Array de Predicate, ex:
   ![4 6](https://user-images.githubusercontent.com/50461475/210439533-dd0b5ae9-daf4-452f-b959-df0290dd1a5f.png)
   
5. Criar um MetaModel para a entidade
   1. no STS, botão direito em cima do projeto -> Properties
   ![5 1](https://user-images.githubusercontent.com/50461475/210439534-536d60f4-11a4-4c2e-8533-921a3024428a.png)
   
   2. Java Compiler -> Annotation Processing
   ![5 2](https://user-images.githubusercontent.com/50461475/210439536-9861867e-42f7-4e13-a510-3eb2b4a166d5.png)
   
   3. Enable project specific settings
   ![5 3](https://user-images.githubusercontent.com/50461475/210439538-acb7a4b3-3b9f-41d3-8b0b-8e91e5f7719e.png)
   
   4. Generated source directory -> src/main/java
   ![5 4](https://user-images.githubusercontent.com/50461475/210439539-a1f4290c-d0f3-42cd-be66-f4d0890c4855.png)
   
   5. na aba esquerda Factory Path -> Enable project specific settings
   ![5 5](https://user-images.githubusercontent.com/50461475/210439541-d203b965-b3da-4665-859e-d1dbcd09a266.png)
   
   6. clicar em adicionar um jar externo
   ![5 6](https://user-images.githubusercontent.com/50461475/210439543-11474c59-4097-495b-a025-07243f097a27.png)
   
   7. procurar no dirétorio abaixo o jar
   8. C:\Users\nomeDoUsuario\.m2\repository\org\hibernate\hibernate-jpamodelgen\5.4.31.Final
   ![5 7](https://user-images.githubusercontent.com/50461475/210439545-f6f396a2-1167-4452-b304-0fd7b8057506.png)
   
   9. se caso não existir o jpamodelgen -> adicionar a dependência jpamodelgen no pom.xml
   ![5 9](https://user-images.githubusercontent.com/50461475/210439548-e2bff970-12d6-4d4e-bd24-3376cb8330f8.png)
   
   10. clicar em Apply -> Apply and Close e aceitar o rebuild
   11. Caso ainda não funcione, rodar o comando na pasta raiz -> mvn clean package -Dmaven.test.skip

6. Voltar na classe de implementação -> ClasseRepositoryImpl
   1. trocar as strings com os nomes dos campos pela Classe do MetaModel

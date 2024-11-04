import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import Thumbnail1 from "../assets/blog22.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={"/posts/werwer/edit"} className="btn sm primary">
              Edit
            </Link>
            <Link to={"/posts/werwer/delete"} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>Este es el titulo del post</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail1} alt="" />
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
          cupiditate dolor sed hic maiores id corporis. Voluptatibus, iure fugit
          doloribus, delectus cupiditate nostrum soluta libero quo eum
          doloremque eos officia qui laudantium. Sequi eum totam omnis! Iusto,
          quos perferendis. Odit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          illo amet exercitationem, ab a modi sunt corrupti earum recusandae.
          Alias explicabo quae quis earum non natus optio sunt. Recusandae non
          neque perferendis sapiente vero quos dolorum rem, cum dolor suscipit
          reprehenderit ullam? Porro dolores quis dicta doloribus maxime
          molestiae placeat harum. Suscipit quidem nemo facilis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iusto
          sapiente magni! Quas, totam. Quae accusamus consequuntur soluta non
          officia nemo adipisci magni vitae doloremque aperiam fugit rerum
          laudantium, fuga molestias sit, praesentium debitis ad labore repellat
          architecto. Quis illo aliquid, fuga facilis repudiandae deserunt
          ipsum, numquam nisi quasi atque dolorem cupiditate fugit asperiores
          delectus nesciunt consequatur. Assumenda voluptas quod corrupti, harum
          magni, repellat autem ratione a sint asperiores cupiditate quae
          facilis deserunt, quam eum dolorum vero saepe? Laudantium voluptatem
          voluptatibus eveniet culpa! Earum sed iusto excepturi similique
          accusamus, cum, et voluptates ut animi iure nesciunt. Officia,
          accusamus voluptas sequi repellendus assumenda qui maxime voluptate
          asperiores magni quaerat adipisci voluptatum totam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus enim
          modi a asperiores. Obcaecati, repellendus amet illo quis ducimus
          cumque.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          repudiandae ullam eos numquam. Nostrum deleniti neque consectetur
          illum non ea nulla eos perferendis. Esse, molestiae expedita. Vel,
          explicabo sed. Quibusdam ratione obcaecati nesciunt quam in distinctio
          nam dolore. Nulla perferendis sit deleniti ab aspernatur voluptates
          consequatur, incidunt unde, repudiandae magnam veritatis pariatur nisi
          suscipit voluptate est. Cum sapiente ipsum officiis quos est! Dolore
          inventore beatae delectus assumenda nulla dicta quis, at dolorem in.
          Cum tempore, et dolore eaque, nulla hic facilis sed similique amet,
          corporis labore nostrum exercitationem minus minima ducimus possimus
          sequi totam aspernatur nobis rerum consectetur veniam modi aliquid?
          Corporis veniam quasi culpa eveniet sit ipsa, laborum omnis
          voluptates? Dicta eaque id corporis ducimus voluptatibus
          necessitatibus quia molestiae quae neque obcaecati est recusandae
          expedita, assumenda ab maxime aliquam et quisquam tempore officia
          deserunt reprehenderit vel commodi odio vitae! Maxime, ab dolorum,
          dignissimos hic, voluptates provident excepturi velit magnam
          exercitationem odio blanditiis deserunt sapiente omnis aperiam vel
          optio rerum recusandae! Voluptates alias nobis doloribus quod magni
          dolor commodi inventore a magnam minus optio, esse similique
          blanditiis saepe impedit nesciunt aperiam nulla adipisci
          necessitatibus illo id iure. Ullam maxime tempora, recusandae cumque,
          obcaecati nulla maiores non dolores unde sit quae.
        </p>
      </div>
    </section>
  );
};

export default PostDetail;

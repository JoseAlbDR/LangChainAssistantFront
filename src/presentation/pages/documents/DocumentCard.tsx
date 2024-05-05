import { Card, CardFooter, Image, Button, Link } from '@nextui-org/react';
import image from '../../../assets/images/paper_2.jpg';
import DeleteDocumentModal from '../../components/delete-modal/DeleteDocumentModal';

interface Payload {
  document: string;
  id: string;
  onDelete: (document: string, onClose: () => void) => void;
}

export default function DocumentCard({ document, onDelete, id }: Payload) {
  const cutName = (document: string) => {
    if (document.length > 20) return document.slice(0, 20) + '...';
    return document;
  };

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className=" h-full border border-secondary col-span-2"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={image}
        width={200}
      />
      <CardFooter className="flex flex-col gap-5 mx-1 ">
        <div className=" text-foreground  h-5 ">{cutName(document)}</div>
        <div className="flex justify-center gap-5 w-full">
          <Button
            className="bg-primary bg-opacity-25  "
            variant="bordered"
            color="success"
            radius="lg"
            size="sm"
          >
            <Link color="success" href={`/assistant/${document}`}>
              Chat
            </Link>
          </Button>
          <DeleteDocumentModal
            onDelete={onDelete}
            document={document}
            id={id}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

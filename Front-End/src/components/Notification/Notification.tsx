import { Toaster, toaster } from '../../components/ui/toaster';

interface Iprops{
    title: string,
    description: string,
    type: string|undefined
}

export const Notification = (prop: Iprops) => {

    toaster.create({
        title: prop.title,
        description: prop.description,
        type: prop.type,
        duration: 3000,
    });

    return (
        <>
           
        </>
    );
};

export default Notification;
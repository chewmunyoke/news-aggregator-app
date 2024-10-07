import IcSpinner from '@/assets/spinner.svg';

export default function LoadingSpinner() {
  return (
    <div className='m-8 flex flex-col items-center justify-center gap-y-4'>
      <IcSpinner className='shrink-0 fill-cyan-500' width={48} height={48} />
      <div className='text-base font-bold lg:text-lg'>Loading</div>
    </div>
  );
}

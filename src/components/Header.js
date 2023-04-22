import Image from "next/image";

export const Header = ({logo, info}) => {
  return (
    <div className="flex bg-slate-200 p-4 rounded-2xl">
    <div className="flex mr-4 justify-center items-center">
        <Image height={200} width={200} src={logo} alt="" />
    </div>
        <div className="flex text-sm font-bold">{info}
    </div>
    </div>
  )
}

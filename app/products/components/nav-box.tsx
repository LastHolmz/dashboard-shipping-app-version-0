import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cutString } from "@/lib/cut"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const NavBox = ({ link, info, className }: { link: string, info: string, className: string }) => {
    return (
        <Link className={className} href={link}>
            <Card className=" transition-all ">
                <CardContent>
                    <p>{cutString(info, 100)}</p>
                </CardContent>
                <CardFooter>
                    <Button className=" w-full" variant={"ghost"}>
                        <ArrowLeftIcon />
                    </Button>
                </CardFooter>
            </Card>
        </Link>

    )
}
export default NavBox
import GithubIcon from "@/components/icons/github";
import XIcon from "@/components/icons/x";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="footer" className="container mx-auto pb-4">
      <div className="rounded-2xl border border-secondary bg-card p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-2">
          <div className="col-span-full md:col-span-1">
            <Logo />
          </div>

          <div className="col-span-full flex items-center justify-start gap-4 md:col-span-1 md:justify-end">
            <Link
              href={"https://github.com/mamorainc/mamora"}
              target="_blank"
              className="transition-all hover:opacity-80"
            >
              <GithubIcon />
            </Link>
            <Link
              href={"https://x.com/mamora_chat"}
              target="_blank"
              className="transition-all hover:opacity-80"
            >
              <XIcon />
            </Link>
          </div>

          {/* <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Contact</h3>
            <div>
              <Link
                href="https://github.com/mamorainc/mamora"
                className="opacity-60 hover:opacity-100"
              >
                Github
              </Link>
            </div>

            <div>
              <Link
                href="https://x.com/mamora_chat"
                className="opacity-60 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Platforms</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                iOS
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Android
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Web
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Help</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Socials</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </Link>
            </div>
          </div> */}
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3>
            &copy; 2024 Developed at
            <Link
              target="_blank"
              href="https://maps.google.co.in/maps"
              className="ml-1 border-primary text-primary transition-all hover:border-b-2"
            >
              SuperLabs
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};

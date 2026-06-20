"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import { useGlobalConfig } from "@/app/providers/global-config";

import { Grid, GridItem } from "../ui/Grid";
import Image from "../ui/image";
import Map from "../ui/Map";
import RichTextRenderer from "../ui/RichTextBlock";
import { GradientSeparator } from "../ui/separator";

const Footer = () => {
  const { globalConfig } = useGlobalConfig();
  const { footerDescription, phoneNumber, email, socialMedia, menu, locations } = globalConfig;
  const { logo } = menu;
  const hasSocialMedia = !!socialMedia.length;

  return (
    <Grid tag="footer" className="border-t-2">
      <GridItem md={6}>
        {logo && (
          <Link href="/" className="block">
            <Image
              src={logo.url}
              alt={logo.name as string}
              width={logo.width}
              height={logo.height}
              className="mb-4 h-auto max-w-75"
            />
          </Link>
        )}
        <RichTextRenderer content={footerDescription} />
      </GridItem>
      <GridItem md={6} className="flex flex-col gap-x-10 gap-y-6 xl:flex-row">
        <div className="flex flex-col gap-3">
          <h4 className="font-bold underline">Liên hệ</h4>
          <div className="flex gap-2">
            <Phone />
            <Link href={`tel:${phoneNumber}`} className="hover:underline">
              {phoneNumber}
            </Link>
          </div>
          <div className="flex gap-2">
            <Mail />
            <Link href={`mailto:${email}`} className="hover:underline">
              {email}
            </Link>
          </div>
          {hasSocialMedia && (
            <div className="flex flex-col gap-3">
              <GradientSeparator className="my-4" />
              <h4 className="font-bold underline">Mạng xã hội</h4>
              <div className="flex gap-2">
                {socialMedia.map((item, index) => {
                  if (index === socialMedia.length - 1) {
                    return (
                      <Link key={item.id} href={item.ctaLink} className="hover:underline">
                        {item.ctaText}
                      </Link>
                    );
                  }
                  return (
                    <Fragment key={item.id}>
                      <Link key={item.id} href={item.ctaLink} className="hover:underline">
                        {item.ctaText}
                      </Link>
                      <div className="after:content-['|']" />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Map lat={locations[0].latitude} lng={locations[0].longitude} />
      </GridItem>
    </Grid>
  );
};

export default Footer;

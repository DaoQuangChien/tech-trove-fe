"use client";

import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import { useGlobalConfig } from "@/app/providers/global-config";
import { Card } from "@/components/ui/card";
import GradientBackdrop from "@/components/ui/GradientBackdrop";
import { Grid, GridItem } from "@/components/ui/Grid";
import Image from "@/components/ui/image";
import Map from "@/components/ui/Map";
import RichTextRenderer from "@/components/ui/RichTextBlock";
import { GradientSeparator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const GLASS_CARD_CLASSES =
  "border border-accent-foreground/50 bg-transparent bg-linear-180 from-slate-700/60 via-slate-800/50 to-slate-900/40 ring-1 ring-inset ring-white/10 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-black/30 text-text-base";

const ContactInfo = () => {
  const { globalConfig } = useGlobalConfig();
  const { footerDescription, phoneNumber, email, socialMedia, locations, menu } = globalConfig;
  const { logo } = menu;
  const hasSocialMedia = !!socialMedia.length;
  const hasLocations = !!locations?.length;

  return (
    <GradientBackdrop className="grow p-6 md:p-20">
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="from-gradient-3 to-gradient-1 self-start bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent">
          Liên hệ
        </h1>
        <GradientSeparator />
      </div>

      <Grid tag="section" data-name="ContactPage" className="items-stretch p-0 md:p-0">
        <GridItem span={4} md={6} className="h-full">
          <Card className={cn("flex h-full flex-col gap-5 p-6", GLASS_CARD_CLASSES)}>
            {logo && (
              <Link href="/" className="block">
                <Image
                  src={logo.url}
                  alt={logo.name as string}
                  width={logo.width}
                  height={logo.height}
                  className="mb-2 h-auto max-w-50"
                />
              </Link>
            )}

            {footerDescription?.length > 0 && (
              <div className="text-text-base leading-relaxed">
                <RichTextRenderer content={footerDescription} />
              </div>
            )}

            <GradientSeparator className="my-2" />

            <div className="flex flex-col gap-3">
              <h4 className="font-bold">Thông tin liên hệ</h4>

              {phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-sky-400" />
                  <Link href={`tel:${phoneNumber}`} className="hover:underline">
                    {phoneNumber}
                  </Link>
                </div>
              )}

              {email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-sky-400" />
                  <Link href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </Link>
                </div>
              )}
            </div>

            {hasSocialMedia && (
              <div className="flex flex-col gap-3">
                <GradientSeparator className="my-2" />
                <h4 className="flex items-center gap-2 font-bold">
                  <Share2 className="size-4 text-sky-400" />
                  Mạng xã hội
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialMedia.map((item, index) => (
                    <Fragment key={item.id}>
                      <Link
                        href={item.ctaLink}
                        target="_blank"
                        rel="noopener"
                        className="hover:underline"
                      >
                        {item.ctaText}
                      </Link>
                      {index !== socialMedia.length - 1 && (
                        <span className="text-accent-foreground/60">|</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </GridItem>

        <GridItem span={4} md={6} className="h-full">
          <Card className={cn("flex h-full flex-col gap-5 p-6", GLASS_CARD_CLASSES)}>
            <h4 className="flex items-center gap-2 font-bold">
              <MapPin className="size-4 text-sky-400" />
              Địa chỉ
            </h4>

            {hasLocations ? (
              <div className="flex flex-col gap-6">
                {locations.map((location) => (
                  <div key={location.id} className="flex flex-col gap-3">
                    <p className="text-text-base">{location.address}</p>
                    <div className="border-accent-foreground/50 overflow-hidden rounded-lg border">
                      <Map lat={location.latitude} lng={location.longitude} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Chưa có thông tin địa chỉ.</p>
            )}
          </Card>
        </GridItem>
      </Grid>
    </GradientBackdrop>
  );
};

export default ContactInfo;

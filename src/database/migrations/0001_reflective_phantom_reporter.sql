ALTER TABLE "products" ALTER COLUMN "image_url" SET DATA TYPE jsonb USING CASE WHEN "image_url" IS NULL THEN '[]'::jsonb ELSE jsonb_build_array("image_url") END;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" SET NOT NULL;
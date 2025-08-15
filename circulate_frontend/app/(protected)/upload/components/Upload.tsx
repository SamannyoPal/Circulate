"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadColumns, UploadColumnType } from "./columns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";

interface UploadProps {
    data: UploadColumnType[],
    total: number,
}

export const Upload = ({ data, total }: UploadProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Files</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 space-y-4">
                <div className="flex items-end justify-end">
                    <Button asChild>
                        <Link href={"/upload/new"}>Share file</Link>
                    </Button>
                </div>
                <DataTable
                    columns={UploadColumns}
                    data={data}
                    totalCount={total}
                />
            </CardContent>
        </Card>
    )
}
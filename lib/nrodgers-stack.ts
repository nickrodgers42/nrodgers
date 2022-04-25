import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as Route53 from 'aws-cdk-lib/aws-route53';
import * as Cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';


export class NrodgersStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const websiteBucket = new Bucket(this, 'nrodgers-bucket', {
            bucketName: 'nrodgers.com',
            versioned: true,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: '404.html',
        });

        websiteBucket.addToResourcePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                principals: [new AnyPrincipal()],
                actions: ['s3:GetObject'],
                resources: [`${websiteBucket.bucketArn}/*`]
            })
        );

        new S3Deployment.BucketDeployment(this, 'nrodgers-deployment', {
            sources: [S3Deployment.Source.asset("./src/build")],
            destinationBucket: websiteBucket,
        });

        const zone = Route53.HostedZone.fromLookup(this, 'hostedZone', {
            domainName: 'nrodgers.com'
        });

        const cert = new Certificate(this, 'certificate', {
            domainName: 'nrodgers.com',
            validation: CertificateValidation.fromDns(zone),
            subjectAlternativeNames: ['*.nrodgers.com']
        });


        const cfDistro = new Cloudfront.Distribution(this, 'cfDistro', {
            domainNames: ["nrodgers.com", "*.nrodgers.com"],
            enabled: true,
            defaultBehavior: {
                origin: new S3Origin(websiteBucket),
                allowedMethods: Cloudfront.AllowedMethods.ALLOW_ALL,
                viewerProtocolPolicy: Cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: new CachePolicy(this, 'cachePolicy', {
                    cachePolicyName: "cachePolicy",
                    defaultTtl: Duration.seconds(300),
                    maxTtl: Duration.seconds(3600),
                    minTtl:  Duration.seconds(60)
                })
            },
            certificate: cert
        });

        const recordSet = new Route53.RecordSet(this, 'recordSet', {
            recordType: Route53.RecordType.A,
            target: Route53.RecordTarget.fromAlias(new CloudFrontTarget(cfDistro)),
            zone: zone,
        });

    }
}
